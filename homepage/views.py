from django.shortcuts import render , redirect
#from django.http import HttpResponse
from .models import Todo
from django.contrib import messages
from .forms import TodoForm
from .forms import TodoUpdateForm

def welcome(request):
    names = {'shortname':'ali'}
    #return HttpResponse('hi welcome to my site')
    return render(request , 'homepage.html' , context = names)

def shop(request):
    table = Todo.objects.all()
    shop = {'data':table}
    return render(request , 'shop.html', context = shop)

def test(request):
    return render(request , 'index.html')

def details(request, table_id):
    tableid = Todo.objects.get(id = table_id)
    dic_det = {'idetail': tableid}
    return render(request, 'detail.html', context = dic_det)

def delete(request , table_id):
    Todo.objects.get(id = table_id).delete()
    messages.info(request, 'Successfuly deleted!' , 'success')
    return redirect('shop')

def form(request):
    if request.method == 'POST':
        form = TodoForm(request.POST)
        if form.is_valid():
            cd = form.cleaned_data
            Todo.objects.create(title = cd['title'] , body = cd['body'] , created = cd ['created'])
            messages.info(request, ' Order Saved!' , 'success')
            return redirect('shop')
    else:
        form = TodoForm()
    return render(request, 'form.html' , {'form': form})

def update(request, table_id):
    old_info = Todo.objects.get(id = table_id)
    if request.method == 'POST':
        updateform = TodoUpdateForm(request.POST , instance=old_info)
        if updateform.is_valid():
            updateform.save()
            messages.success(request,'info Updated!')
            return redirect('table id detail',table_id)
    else:
        updateform = TodoUpdateForm(instance=old_info)
    return render(request, 'updateform.html', {'updateform':updateform})