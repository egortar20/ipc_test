from sqlalchemy import Column, Integer, ForeignKey, VARCHAR, UniqueConstraint
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

Base = declarative_base()

class Author(Base):
    __tablename__ = 'authors'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    name = Column(VARCHAR(255), nullable=False)
    country = Column(VARCHAR(255))

class Book(Base):
    __tablename__ = 'books'

    id = Column(Integer, primary_key=True, autoincrement=True, nullable=False)
    author_id = Column(Integer, ForeignKey(f'{Author.__tablename__}.{Author.id.name}'), nullable=False)
    title = Column(VARCHAR(255), nullable=False)
    description = Column(VARCHAR(1000))
    author = relationship('Author', backref='book')        

