from rest_framework import serializers
from .models import Exam, Question, Responses, Result

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'
        
class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'
        
class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Responses
        fields = '__all__'
        
class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'
        

