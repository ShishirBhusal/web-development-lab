from fastapi import FastAPI, HTTPException
from passlib.context import CryptContext
from db import database, engine, metadata
from models import users
from schema import UserCreate, UserLogin

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
    return {"message": "Login successful"}
