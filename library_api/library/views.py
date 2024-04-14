from datetime import datetime, timedelta
from django.utils import timezone
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response

from rest_framework import viewsets
from .models import Author, Book, Member, Loan
from .serializers import AuthorSerializer, BookSerializer, MemberSerializer, LoanSerializer

class AuthorViewSet(viewsets.ModelViewSet):
    queryset = Author.objects.all()
    serializer_class = AuthorSerializer

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class MemberViewSet(viewsets.ModelViewSet):
    queryset = Member.objects.all()
    serializer_class = MemberSerializer

class LoanViewSet(viewsets.ModelViewSet):
    queryset = Loan.objects.all()
    serializer_class = LoanSerializer

    @action(detail=True, methods=['post'])
    def return_loan(self, request, pk=None):
        try:
            loan = self.get_object()
            book = loan.book
            loan.return_date = datetime.now()
            loan.save()
                
            return Response({'message': 'Loan returned successfully'}, status=200)
        except Loan.DoesNotExist:
            return Response({'error': 'Loan not found'}, status=404)
    
    @action(detail=False, methods=['get'])
    def overdue_books(self, request):
        overdue_loans = Loan.objects.filter(return_date__isnull=True, loan_date__lte=timezone.now() - timedelta(days=15))
        serializer = LoanSerializer(overdue_loans, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def not_returned_books(self, request):
        not_returned_loans = Loan.objects.filter(return_date__isnull=True)
        serializer = LoanSerializer(not_returned_loans, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def returned_on_time_books(self, request):
        try:
            # Define the loan period (e.g., 15 days)
            loan_period = 15

            # Calculate the threshold date for on-time returns
            threshold_date = datetime.now() - timedelta(days=loan_period)

            # Query for books with return_date within the loan period
            on_time_books = Book.objects.filter(loan__return_date__gte=threshold_date)

            # Serialize the books returned on time
            serializer = BookSerializer(on_time_books, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({'error': str(e)}, status=400)



