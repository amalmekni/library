# Generated by Django 4.2.11 on 2024-04-12 22:01

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0002_book_image_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Loan',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('loan_date', models.DateField(auto_now_add=True)),
                ('return_date', models.DateField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=100)),
                ('num_loans', models.IntegerField(default=0)),
            ],
        ),
        migrations.DeleteModel(
            name='Adherent',
        ),
        migrations.RemoveField(
            model_name='author',
            name='biography',
        ),
        migrations.RemoveField(
            model_name='book',
            name='category',
        ),
        migrations.RemoveField(
            model_name='book',
            name='description',
        ),
        migrations.RemoveField(
            model_name='book',
            name='image_url',
        ),
        migrations.RemoveField(
            model_name='book',
            name='isbn',
        ),
        migrations.RemoveField(
            model_name='book',
            name='publish_date',
        ),
        migrations.AddField(
            model_name='author',
            name='first_name',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='book',
            name='num_pages',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='author',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='book',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
        migrations.AddField(
            model_name='loan',
            name='book',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.book'),
        ),
        migrations.AddField(
            model_name='loan',
            name='member',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='library.member'),
        ),
        migrations.AddField(
            model_name='book',
            name='borrowers',
            field=models.ManyToManyField(through='library.Loan', to='library.member'),
        ),
    ]