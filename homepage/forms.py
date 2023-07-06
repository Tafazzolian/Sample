from django import forms
from .models import Todo

class TodoForm(forms.Form):
    title = forms.CharField()
    body = forms.CharField(label='Text')
    created = forms.DateTimeField(required=True, label='Date')

class TodoUpdateForm(forms.ModelForm):
    class Meta:
        model = Todo
        #fields = ('title' , 'body')
        #fields = ['title','body','created']
        fields = '__all__'