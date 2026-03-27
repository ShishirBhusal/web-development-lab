from fastapi import FastAPI, HTTPException
from passlib.context import CryptContext
from db import database, engine, metadata
from models import users, todos
from schema import UserCreate, UserLogin, TodoCreate

app = FastAPI()
metadata.create_all(engine)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

@app.on_event("startup")
async def startup():
    await database.connect()

@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()

@app.post("/register")
async def register_user(user: UserCreate):
    existing = await database.fetch_one(users.select().where(users.c.email == user.email))
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    hashed = pwd_context.hash(user.password)
    await database.execute(users.insert().values(name=user.name, email=user.email, password=hashed))
    return {"message": "User registered successfully"}

@app.post("/login")
async def login_user(user: UserLogin):
    record = await database.fetch_one(users.select().where(users.c.email == user.email))
    if not record or not pwd_context.verify(user.password, record.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")
    return {"message": "Login successful", "user_id": record.id}

@app.get("/todos/{user_id}")
async def get_todos(user_id: int):
    rows = await database.fetch_all(todos.select().where(todos.c.user_id == user_id))
    return rows

@app.post("/todos/{user_id}")
async def add_todo(user_id: int, todo: TodoCreate):
    user = await database.fetch_one(users.select().where(users.c.id == user_id))
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    new_id = await database.execute(todos.insert().values(title=todo.title, done=False, user_id=user_id))
    return {"message": "Todo added", "id": new_id}

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    await database.execute(todos.delete().where(todos.c.id == todo_id))
    return {"message": "Deleted"}
