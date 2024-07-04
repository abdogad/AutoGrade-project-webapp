from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Exam(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    def __str__(self):
        return self.title
    
    
class Question(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    question = models.CharField(max_length=1000)
    answer = models.CharField(max_length=100)
    graded = models.BooleanField(default=True)
    def __str__(self):
        return self.question
    
class Responses(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    response = models.CharField(max_length=100)
    
    def __str__(self):
        return self.response
    
class Result(models.Model):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE)
    csv_file = models.FileField(upload_to='media/')
    
    def __str__(self):
        return self.student_name
    
