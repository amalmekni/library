# Generated by Django 4.2.11 on 2024-04-12 22:25

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('library', '0003_loan_member_delete_adherent_remove_author_biography_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='author',
            old_name='name',
            new_name='last_name',
        ),
    ]
