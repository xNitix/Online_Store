from flask import Flask, jsonify, request
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, JWTManager, get_jwt
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy import Column, Integer, String, Boolean, Double
from marshmallow import post_load
import bcrypt
from datetime import datetime
from flask_jwt_extended import verify_jwt_in_request



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

    
class Orders(db.Model):
    id = Column(Integer, primary_key=True)
    user_id = Column(String)
    total_price = Column(Double)
    dinosaur_names = Column(String)
    


#-----------------------SCHEMAS-----------------------#
class PersonSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Person
        fields = ("id", "name", "surname", "login", "password", "isAdmin")
        
class DinosaurSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Dinosaur
        fields = ("id", "name", "description", "type", "price", "level", "image", "sex")
        
class OrdersSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Orders
        fields = ("id", "user_id", "total_price", "dinosaur_names")

        
#-----------------------ROUTES-----------------------#        

#-----------------------Users------------------------#
@app.route('/login', methods=["POST"])
def login():
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    user = Person.query.filter_by(login=username).first()

    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        print(f"User isAdmin: {user.isAdmin}")
        access_token = create_access_token(identity=username, additional_claims={'isAdmin': user.isAdmin})
        return jsonify(token=access_token)
    else:
        return jsonify({"msg": "Bad username or password"}), 401
    
    
@app.route('/users', methods=["GET"])
@jwt_required()
def protected():
    current_user = get_jwt()
    is_admin = current_user.get('isAdmin', False)
    if is_admin:
        # Tutaj wykonaj odpowiednie operacje tylko dla admina
        return jsonify({"message": "Admin access granted"})
    else:
        return jsonify({"message": "User access granted"})
    
    
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
    
@app.route('/persons/<int:person_id>', methods=['PUT'])
def change_user_role(person_id):
    data = request.json
    user = Person.query.get_or_404(person_id)

    if 'isAdmin' in data:
        user.isAdmin = data['isAdmin']
        db.session.commit()
        return jsonify({"message": "User role updated"}), 200
    else:
        return jsonify({"error": "Invalid request"}), 400
    
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
    

@app.route('/dinosaurs/<int:dinosaur_id>', methods=['PUT'])
def update_dinosaur(dinosaur_id):
    data = request.json
    dinosaur = Dinosaur.query.get_or_404(dinosaur_id)

    if 'name' in data:
        dinosaur.name = data['name']
    if 'description' in data:
        dinosaur.description = data['description']
    if 'type' in data:
        dinosaur.type = data['type']
    if 'price' in data:
        dinosaur.price = data['price']
    if 'level' in data:
        dinosaur.level = data['level']
    if 'image' in data:
        dinosaur.image = data['image']
    if 'sex' in data:
        dinosaur.sex = data['sex']

    db.session.commit()
    return jsonify({"message": "Dinosaur updated"}), 200

#--------------------Orders-----------------------#
@app.route('/api/orders', methods=['POST'])
def create_order():
    try:
        # Pobierz wartość nagłówka "Authorization"
        authorization_header = request.headers.get('Authorization')
        print('Authorization Header:', authorization_header)

        verify_jwt_in_request()
        current_user = get_jwt_identity()
        print('get_jwt_identity:', current_user)

        user = Person.query.filter_by(login=current_user).first()

        data = request.json
        dinosaur_ids = data.get('dinosaur_ids', [])

        dinosaurs = Dinosaur.query.filter(Dinosaur.id.in_(dinosaur_ids)).all()
        dinosaur_names1 = ', '.join([dinosaur.name for dinosaur in dinosaurs])  # Łączymy nazwy dinozaurów w jeden ciąg znaków
        total_price = sum(dinosaur.price for dinosaur in dinosaurs)
        
        new_order = Orders(user_id=user.login, total_price=total_price, dinosaur_names=dinosaur_names1)
        db.session.add(new_order)
        db.session.commit()

        return jsonify({"message": "Order created"}), 201
    except Exception as e:
        print(f"Error creating order: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500


@app.route('/api/orders', methods=['GET'])
def get_all_orders():
    try:
        # Pobierz wszystkie zamówienia z bazy danych
        orders = Orders.query.all()

        # Przekształć zamówienia na format JSON za pomocą schematu OrderSchema
        orders_schema = OrdersSchema(many=True)
        serialized_orders = orders_schema.dump(orders)

        # Zwróć zamówienia w formie JSON
        return jsonify({"orders": serialized_orders})

    except Exception as e:
        # W razie błędu zwróć odpowiednią wiadomość lub kod błędu
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/orders/del', methods=['DELETE'])
def delete_all_orders():
    try:
        # Usuń wszystkie zamówienia
        Orders.query.delete()
        db.session.commit()

        return jsonify({"message": "All orders deleted"}), 200
    except Exception as e:
        print(f"Error deleting all orders: {str(e)}")
        return jsonify({"error": "Internal Server Error"}), 500


#-----------------------MAIN-----------------------# 
if __name__ == '__main__':
    with app.app_context():
        #db.drop_all()
        db.create_all()
    app.run(debug=True)



