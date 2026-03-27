from sqlalchemy import Table, Column, Integer, String
from db import metadata

users = Table("users", metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("email", String, unique=True, nullable=False, index=True),
    Column("password", String, nullable=False)
)
