from . import views
from django.urls import path

urlpatterns = [
    path('create/', views.CreateExamAPI.as_view(), name='create_exam'),
    path('list/', views.ExamListAPI.as_view(), name='exam_list'),
    path('exam/<int:pk>/questions/', views.ExamQuestionsAPI.as_view(), name='exam_questions'), 
    path('response/', views.ResponseSendAPI.as_view(), name='response_send'),
]
