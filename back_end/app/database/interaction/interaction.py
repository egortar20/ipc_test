import os
import sys 
import json

from flask.json import jsonify
from sqlalchemy import inspect
from werkzeug.wrappers import response

sys.path.insert(1, os.path.join(sys.path[0], '../../../'))

from app.database.exceptions import AuthorNotFoundException, AuthorsBooksNotFound, BookNotFoundException
from app.database.models.models import Author, Base, Book
from app.database.client.client import MySQLConnection


class DbInteraction:

    def __init__(self, host, port, user, password, db_name, rebuild_db=False):
        self.mysql_connection = MySQLConnection(
            host=host,
            port=port,
            user=user,
            password=password,
            db_name=db_name,
            rebuild_db=rebuild_db
        )

        self.engine = self.mysql_connection.connection.engine
        self.inspector = inspect(self.engine)

        if rebuild_db:
            self.create_tables_authors()
            self.create_tables_books()

    def create_tables_authors(self):
        if not self.inspector.has_table('authors'):
        #if not self.engine.dialect.has_table(self.engine, 'authors'):
            Base.metadata.tables['authors'].create(self.engine)
        else:
            self.mysql_connection.execute_query('DROP TABLE IF EXISTS authors')
            Base.metadate.tables['authors'].create(self.engine)

    def create_tables_books(self):
        if not self.inspector.has_table('books'):
            Base.metadata.tables['books'].create(self.engine)
        else:
            self.mysql_connection.execute_query('DROP TABLE IF EXISTS books')
            Base.metadate.tables['books'].create(self.engine)

    def add_author(self, name, country):
        author = Author(
            name = name,
            country = country
        )
        self.mysql_connection.session.add(author)
        self.mysql_connection.session.flush()
        self.mysql_connection.session.refresh(author)
        return self.get_author(author.id)

    def del_author(self, id):
        author = self.mysql_connection.session.query(Author).filter_by(id=id)
        if author:
            author.delete()
            self.mysql_connection.session.expire_all()
            return 'Deleted'
        else:
            raise AuthorNotFoundException(f'Author with id{id} id not found!')

    def get_author(self, id):
        author = self.mysql_connection.session.query(Author).filter_by(id=id).first()
        if author:
            self.mysql_connection.session.expire_all()
            return {'id': author.id, 'name': author.name, 'country': author.country}
        else:
            raise AuthorNotFoundException(f'Author "{id}" is not found!')

    def edit_author(self, id, new_name=None, new_country=None):
        author = self.mysql_connection.session.query(Author).filter_by(id=id).first()
        if author:
            if new_name is not None:
                author.name = new_name
            if new_country is not None:
                author.country = new_country
            return self.get_author(id)
        else:
            raise AuthorNotFoundException(f'Author {id} is not found')



    
    def get_authors(self):
        authors = self.mysql_connection.session.query(Author)
        if authors:
            self.mysql_connection.session.expire_all()
            res = []
            for author in authors:
                res.append({'id': author.id, 'name': author.name, 'country': author.country})

            return res
        else:
            raise AuthorNotFoundException(f'Authors are not found!')

    def add_book(self, title, description, author_id):
        book = Book(
            title=title,
            description=description,
            author_id=author_id
        )
        self.mysql_connection.session.add(book)
        self.mysql_connection.session.flush()
        self.mysql_connection.session.refresh(book)
        return self.get_book(book.id)

    def del_book(self, id):
        book = self.mysql_connection.session.query(Book).filter_by(id=id)
        if book:
            book.delete()
            self.mysql_connection.session.expire_all()
            return 'Deleted'
        else:
            raise AuthorNotFoundException(f'Book id {id} is not found!')
        
            

    def get_book(self, id):
        book = self.mysql_connection.session.query(Book).filter_by(id=id).first()
        if book:
            self.mysql_connection.session.expire_all()
            return {'id': book.id, 'title': book.title, 'description': book.description, 'author_id': book.author_id}
        else:
            raise BookNotFoundException(f'Book  id "{id}" is not found!')

    def edit_book(self, id, new_title=None, new_description=None, new_author_id=None):
        book = self.mysql_connection.session.query(Book).filter_by(id=id).first()
        if book:
            if new_title is not None:
                book.name = new_title
            if new_description is not None:
                book.country = new_description
            return self.get_book(id)
        else:
             raise BookNotFoundException(f'Book id {id} is not found')

    def get_books_by_author(self, author_id):
        books = self.mysql_connection.session.query(Book).filter_by(author_id=author_id)
        if books:
            res = []
            for book in books:
                res.append({'id': book.id, 'title': book.title, 'descripton': book.description, 'author_id': book.author_id})
            
            return res
        else:
            raise AuthorsBooksNotFound(f'Author with id:{author_id} has no books')


