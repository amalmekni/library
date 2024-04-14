from django.core.management.base import BaseCommand
from library.models import Author, Book, Member, Loan
from datetime import date, timedelta

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **kwargs):
        # Create Authors
        author1 = Author.objects.create(last_name='Tolkien', first_name='J.R.R.')
        author2 = Author.objects.create(last_name='Rowling', first_name='J.K.')
        
        # Create Members
        member1 = Member.objects.create(name='John Doe', num_loans=0)
        member2 = Member.objects.create(name='Jane Smith', num_loans=0)
        member3 = Member.objects.create(name='Alice Johnson', num_loans=0)
        
        # Create Books
        book1 = Book.objects.create(title='The Hobbit', num_pages=295, author=author1, image_url='https://m.media-amazon.com/images/I/712cDO7d73L._AC_UF1000,1000_QL80_.jpg')
        book2 = Book.objects.create(title='The Lord of the Rings', num_pages=1178, author=author1, image_url='https://www.casualoptimist.com/wp-content/uploads/2020/09/fellowship-of-the-ring-illustration-johan-egerkrans-1000x1500.jpg')
        book3 = Book.objects.create(title='Harry Potter and the Sorcerer\'s Stone', num_pages=309, author=author2, image_url='https://m.media-amazon.com/images/I/71-++hbbERL._AC_UF894,1000_QL80_.jpg')
        book4 = Book.objects.create(title='Harry Potter and the Chamber of Secrets', num_pages=341, author=author2, image_url='https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855669.jpg')
        
        # Add borrowers to books
        book1.borrowers.add(member1, member2)
        book2.borrowers.add(member1)
        book3.borrowers.add(member2, member3)
        book4.borrowers.add(member1)
        
        # Create Loans
        today = date.today()
        loan_duration = timedelta(days=15)  # 15 days loan duration
        
        # Create loans with null return dates
        loan1 = Loan.objects.create(book=book1, member=member1, loan_date=today, return_date=None)
        loan2 = Loan.objects.create(book=book3, member=member2, loan_date=today, return_date=None)
        loan3 = Loan.objects.create(book=book2, member=member1, loan_date=today, return_date=None)
        loan4 = Loan.objects.create(book=book4, member=member3, loan_date=today, return_date=None)
        
        # Update member's number of loans
        member1.num_loans += 1
        member1.save()
        member2.num_loans += 1
        member2.save()
        member3.num_loans += 1
        member3.save()
        
        self.stdout.write(self.style.SUCCESS('Successfully seeded the database'))
