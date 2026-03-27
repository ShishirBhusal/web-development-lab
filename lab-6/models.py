from sqlalchemy import Table, Column, Integer, String, Boolean, ForeignKey
from db import metadata

users = Table("users", metadata,
    Column("id", Integer, primary_key=True),
    Column("name", String, nullable=False),
    Column("email", String, unique=True, nullable=False, index=True),
    Column("password", String, nullable=False)
)

todos = Table("todos", metadata,
    Column("id", Integer, primary_key=True),
    Column("title", String, nullable=False),
    Column("done", Boolean, default=False),
    Column("user_id", Integer, ForeignKey("users.id"), nullable=False)
)
