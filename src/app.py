from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, Integer, String, Boolean, Double
from marshmallow import post_load
import bcrypt


app = Flask(__name__)
CORS(app)

app.config["JWT_SECRET_KEY"] = "super-secret"
jwt = JWTManager(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///demo.sqlite"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
db = SQLAlchemy(app)
ma = Marshmallow(app)


#-----------------------MODELS-----------------------#
class Person(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    surname = Column(String)
    login = Column(String, unique=True)
    password = Column(String)
    isAdmin = Column(Boolean, default=False)

    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)
    
class Dinosaur(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    type = Column(String)
    price = Column(Double)
    level = Column(Integer)
    image = Column(String)
    sex = Column(String)

    @post_load
    def make_user(self, data, **kwargs):
        return Person(**data)


#-----------------------SCHEMAS-----------------------#
class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        fields = ("id", "name", "surname", "login", "password", "isAdmin")
        
class DinosaurSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Dinosaur
        fields = ("id", "name", "description", "type", "price", "level", "image", "sex")
        

#-----------------------ROUTES-----------------------#        

#-----------------------Users------------------------#
@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # Sprawdzenie, czy użytkownik o podanym 'username' istnieje w bazie danych
    user = Person.query.filter_by(login=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        access_token = create_access_token(identity=username)
        return jsonify(token=access_token)
    else:
        return jsonify({"msg": "Bad username or password"}), 401
    
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    existing_user = Person.query.filter_by(login=data['username']).first()

    if existing_user:
        return jsonify({"msg": "User already exists"}), 400

    if data['password'] != data['confirmPassword']:
        return jsonify({"msg": "Passwords do not match"}), 400

    new_person = Person(
        name=data['firstname'],
        surname=data['lastname'],
        login=data['username'],
        password=bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()),
        isAdmin=False  # Ustalono na stałe jako False, możesz to zmienić
    )
    db.session.add(new_person)
    db.session.commit()
    return jsonify({"message": "Registration successful"}), 201
    
    
@app.route("/protected", methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

@app.route('/persons', methods=['GET', 'POST'])
def manage_persons():
    if request.method == 'GET':
        all_persons = Person.query.all()
        person_schema = PersonSchema(many=True)
        serialized_persons = person_schema.dump(all_persons)
        return jsonify({"persons": serialized_persons})
    elif request.method == 'POST':
        data = request.json
        new_person = Person(
            name=data['name'],
            surname=data['surname'],
            login=data['login'],
            password=bcrypt.hashpw(data['password'].encode('utf-8'), bcrypt.gensalt()),
            isAdmin=data['isAdmin']
        )
        db.session.add(new_person)
        db.session.commit()
        return jsonify({"message": "Person added"})

@app.route('/persons/<int:person_id>', methods=['GET', 'DELETE'])
def get_or_delete_person(person_id):
    if request.method == 'GET':
        person = Person.query.get_or_404(person_id)
        person_schema = PersonSchema()
        serialized_person = person_schema.dump(person)
        return jsonify({"person": serialized_person})
    elif request.method == 'DELETE':
        person = Person.query.get_or_404(person_id)
        db.session.delete(person)
        db.session.commit()
        return jsonify({"message": "Person deleted"})
    
#-----------------------Dinosaurs-----------------------#    
    
@app.route('/dinosaurs', methods=['GET'])
def get_dinosaurs():
    all_dinosaurs = Dinosaur.query.all()
    dinosaur_schema = DinosaurSchema(many=True)
    serialized_dinosaurs = dinosaur_schema.dump(all_dinosaurs)
    return jsonify({"dinosaurs": serialized_dinosaurs})

@app.route('/dinosaurs', methods=['POST'])
def add_dinosaur():
    data = request.json

    new_dinosaur = Dinosaur(
        name=data['name'],
        description=data['description'],
        type=data['type'],
        price=data['price'],
        level=data['level'],
        image=data['image'],
        sex=data['sex']
    )

    db.session.add(new_dinosaur)
    db.session.commit()

    return jsonify({"message": "Dinosaur added"}), 201

@app.route('/dinosaurs/<int:dinosaur_id>', methods=['DELETE'])
def delete_dinosaur(dinosaur_id):
    dinosaur = Dinosaur.query.get_or_404(dinosaur_id)
    db.session.delete(dinosaur)
    db.session.commit()
    return jsonify({"message": "Dinosaur deleted"})    
    

#-----------------------MAIN-----------------------# 
if __name__ == '__main__':
    with app.app_context():
        #db.drop_all()
        db.create_all()
    app.run(debug=True)



