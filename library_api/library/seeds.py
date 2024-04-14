# library/seeds.py

from library.models import Author, Book, Member, Loan
from datetime import date

def seed_authors():
    authors = [
        {
            "last_name": "King",
            "first_name": "Stephen"
        },
        {
            "last_name": "Rowling",
            "first_name": "Joanne"
        },
        {
            "last_name": "Orwell",
            "first_name": "Eric"
        },
        # Add more authors as needed
    ]

    for author_data in authors:
        last_name = author_data["last_name"]
        first_name = author_data["first_name"]
        if not Author.objects.filter(last_name=last_name, first_name=first_name).exists():
            Author.objects.create(last_name=last_name, first_name=first_name)

def seed_books():
    books = [
        {
            "title": "The Shining",
            "num_pages": 400,
            "author_last_name": "King"
        },
        {
            "title": "Harry Potter and the Sorcerer's Stone",
            "num_pages": 320,
            "author_last_name": "Rowling"
        },
        {
            "title": "1984",
            "num_pages": 328,
            "author_last_name": "Orwell"
        },
        # Add more books as needed
    ]

    for book_data in books:
        title = book_data["title"]
        author_last_name = book_data.pop("author_last_name")
        authors = Author.objects.filter(last_name=author_last_name)
        if authors.exists():
            author = authors.first()
            Book.objects.create(author=author, title=title, **book_data)

def seed_members():
    members = [
        {
            "name": "Alice Johnson",
            "num_loans": 2
        },
        {
            "name": "Bob Smith",
            "num_loans": 1
        },
        {
            "name": "Emma Brown",
            "num_loans": 0
        },
        # Add more members as needed
    ]

    for member_data in members:
        name = member_data["name"]
        if not Member.objects.filter(name=name).exists():
            Member.objects.create(**member_data)

# Call the seed functions if this script is executed directly
if __name__ == "__main__":
    seed_authors()
    seed_books()
    seed_members()
