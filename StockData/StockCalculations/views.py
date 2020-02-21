from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Analise
import json
import sqlite3
import shutil
import sys
import os
from django.conf import settings
sys.path.append(settings.BASE_DIR+'/StockCalculations/funcoesAuxiliares')
from funcoes import *

@csrf_exempt
def LoadLists(request):
    dict = {}
    print(settings.BASE_DIR)
    ativos = [line.rstrip('\n') for line in open(settings.BASE_DIR+'/StockCalculations/FilesComListas/cryptocurrencies')]
    operacoes = [line.rstrip('\n') for line in open(settings.BASE_DIR+'/StockCalculations/FilesComListas/Operacoes')]
    ativos = json.dumps(ativos)
    operacoes = json.dumps(operacoes)
    dict['ativos'] = ativos
    dict['operacoes'] = operacoes
    return JsonResponse(dict)

def retornaAplicao(request):
    return render(request,'StockCalculations/aplication.html')

@csrf_exempt
def printaDict(request):
    Atual = settings.MEDIA_ROOT +'/Atual'
    if(os.path.isdir(Atual)):
        shutil.rmtree(Atual)

    inputs = request.POST.get("dict")
    inputsConvertidos = json.loads(inputs)

    # for input in inputsConvertidos:
    #     print(input)

    count = 0
    for input in inputsConvertidos:
        df = ConstroiDataFrame(input['Ativos'],input['Periodo'][0],input['Periodo'][1])
        [result,count] = calculaResultado(df,input,count)
        input['resultado'] = result
    request.session['inputAtual'] = inputsConvertidos

    # for input in inputsConvertidos:
    #     print(input)

    inputsConvertidos = json.dumps(inputsConvertidos)
    a = {}
    a['inputsConvertidos'] = inputsConvertidos
    a['count'] = count
    return JsonResponse(a)

@csrf_exempt
def printainputAtual(request):
    inputAtual = request.session.get('inputAtual')
    for input in inputAtual:
        analise = Analise.objects.create(
            ativo = input['Ativos'],
            periodoInicial = input['Periodo'][0],
            periodoFinal = input['Periodo'][1],
            operacao = input['Operacoes'],
            resultado = str(input['resultado']),
        )
        analise.save()
    return render(request,'StockCalculations/aplication.html')
