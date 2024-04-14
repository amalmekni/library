from django.db import models

class Author(models.Model):
    id = models.AutoField(primary_key=True)
    last_name = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100, null=True)

    def __str__(self):
        return f"{self.name} {self.first_name}"

class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    num_pages = models.IntegerField(null=True)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    image_url = models.URLField(blank=True, null=True)
    borrowers = models.ManyToManyField('Member', through='Loan')

    def __str__(self):
        return self.title

class Member(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    num_loans = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Loan(models.Model):
    id = models.AutoField(primary_key=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    member = models.ForeignKey(Member, on_delete=models.CASCADE)
    loan_date = models.DateField(auto_now_add=True)
    return_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.member} - {self.book}"
