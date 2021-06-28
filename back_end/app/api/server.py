import os
import sys

from werkzeug.wrappers import response

sys.path.insert(1, os.path.join(sys.path[0], '../../'))


from werkzeug.exceptions import abort
from app.database.exceptions import AuthorNotFoundException, BookNotFoundException
from flask.json import jsonify
from app.database.interaction.interaction import DbInteraction
from app.api.utils import config_parser
import threading
import argparse

from flask import Flask, request
from flask_cors import CORS, cross_origin

class Server:

    def __init__(self, host, port, db_host, db_port, db_user, db_pass, db_name, rebuild_db=False):
        self.host = host
        self.port = port

        self.app = Flask(__name__)
        CORS(self.app)
        
        self.app.add_url_rule('/', view_func=self.get_home)

        self.app.register_error_handler(404, self.page_not_found)

        self.app.add_url_rule('/author/add', view_func=self.add_author, methods=['POST'])
        self.app.add_url_rule('/authors/get', view_func=self.get_authors)
        self.app.add_url_rule('/author/get/<id>', view_func=self.get_author)
        self.app.add_url_rule('/author/edit/<id>', view_func=self.edit_author, methods=['PUT'])
        self.app.add_url_rule('/author/del/<id>', view_func=self.del_author, methods=['DELETE'])
        self.app.add_url_rule('/book/add', view_func=self.add_book, methods=['POST'])
        self.app.add_url_rule('/book/get/<id>', view_func=self.get_book)
        self.app.add_url_rule('/book/edit/<id>', view_func=self.edit_book, methods=['PUT'])
        self.app.add_url_rule('/book/del/<id>', view_func=self.del_book, methods=['DELETE'])
        self.app.add_url_rule('/book/get/by_author/<id>', view_func=self.get_books_by_author)

         


        self.db_interaction = DbInteraction(
            user=db_user,
            password=db_pass,
            host=db_host,
            port=db_port,
            db_name=db_name,
            rebuild_db=True  #Пересоздание бд при запуске
        )

    def page_not_found(self, err):
        return jsonify(error=str(err)), 404

    def run_server(self):
        self.server = threading.Thread(target=self.app.run, kwargs={'host' : self.host, 'port': self.port})
        self.server.start()
        return self.server

    def get_home(self):
        return 'Hello, it`s a working APIv1.0 for IPC test'

    def add_author(self):
        request_body = dict(request.json)
        name = request_body['name']
        country = request_body['country']
        author = self.db_interaction.add_author(
            name=name,
            country=country
        )
        response = jsonify(author)
        response.status_code = 200
        return response
    
    def del_author(self, id):
        try:
            author = self.db_interaction.del_author(id)
            response = jsonify(author)
            response.status_code = 200
            return response
        except AuthorNotFoundException:
            abort(404, description="Author is not found")
    
    def get_author(self, id):
        try:
            author = self.db_interaction.get_author(id)
            response = jsonify(author)
            response.status_code = 200
            return response
        except AuthorNotFoundException:
            abort(404, description="Author is not found")

    def get_authors(self):
        try:
            authors = self.db_interaction.get_authors()
            return jsonify(authors)
        except AuthorNotFoundException:
            abort(404, description="Author not found")
    
    def edit_author(self, id):
        request_body = dict(request.json)
        try: 
            request_body['name']
        except:
            request_body['name']  = None

        try:
            request_body['country']
        except: 
            request_body['country'] = None

        new_name = request_body['name']
        new_counrty = request_body['country']
        try:
            self.db_interaction.edit_author(
                id=id,
                new_name=new_name,
                new_country=new_counrty
            )
            response = jsonify('Success')
            response.status_code = 200
            return response
        except AuthorNotFoundException:
            abort(404, f'Author {id} is not found!')

    def add_book(self):
        request_body = dict(request.json)
        title = request_body['title']
        description = request_body['description']
        author_id = request_body['author_id']
        book = self.db_interaction.add_book(
            title=title,
            description=description,
            author_id=author_id
        )
        response = jsonify(book)
        response.status_code = 200
        return response

    def get_book(self, id):
            try:
                book = self.db_interaction.get_book(id)
                response = jsonify(book)
                response.status_code = 200
                return response
            except  BookNotFoundException:
                abort(404, description="Book is not found")

    def get_books_by_author(self, id):
        try:
            books = self.db_interaction.get_books_by_author(id)
            response = jsonify(books)
            response.status_code = 200
            return response
        except AuthorNotFoundException:
            abort(404, description="Author not found")

    def edit_book(self, id):
        request_body = dict(request.json)
        new_title = request_body['title']
        new_description = request_body['description']
        new_author_id = request_body['author_id']
        try:
            self.db_interaction.edit_book(
                id=id,
                new_title=new_title,
                new_description=new_description,
                new_author_id=new_author_id
            )
            response = jsonify('Success')
            response.status_code = 200
            return response
        except BookNotFoundException:
            abort(404, f'Book is not found!')

    def del_book(self, id):
        try:
            book = self.db_interaction.del_book(id)
            response = jsonify(book)
            response.status_code = 200
            return response
        except BookNotFoundException:
            abort(404, description="Book is not found")


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('--config', type=str, dest='config')


    args = parser.parse_args()

    config = config_parser(args.config)


    server_host = config["SERVER_HOST"]
    server_port = config["SERVER_PORT"]

    db_host = config["DB_HOST"]
    db_port = config["DB_PORT"]
    db_user = config["DB_USER"]
    db_password = config["DB_PASSWORD"]
    db_name = config["DB_NAME"]

    server = Server(
        host=server_host,
        port=server_port,
        db_host=db_host,
        db_port=db_port,
        db_user=db_user,
        db_pass=db_password,
        db_name=db_name
    )

    server.run_server()



