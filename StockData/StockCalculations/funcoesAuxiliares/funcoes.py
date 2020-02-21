import pandas as pd
import numpy as np
import pandas_datareader as pdr
import datetime as dt
import matplotlib.pyplot as plt
import shutil
import os
from django.conf import settings

def ConstroiDataFrame(ativo,pinicio,pfim):
    pinicio = pinicio.split('-')
    pfim = pfim.split('-')
    for x in range(len(pinicio)):
        pinicio[x] = int(pinicio[x])
        pfim[x] = int(pfim[x])
    start = dt.datetime(pinicio[0],pinicio[1],pinicio[2])
    end = dt.datetime(pfim[0],pfim[1],pfim[2])
    df = pdr.get_data_yahoo(ativo,start, end)
    return df

def RealizaOperacao(x,op):
    return getattr(x,op)()

def geraGraficos(dados,count):
    Atual = settings.MEDIA_ROOT + '/Atual'
    existeAtual = os.path.isdir(Atual)
    if(not(existeAtual)):
        os.mkdir(Atual)
    img = dados.plot()
    plt.savefig(Atual+'/graph'+str(count)+'.png')
    plt.cla()
    plt.clf()

def calculaResultado(df,input,count):
    valoresConsiderados = df['Close']
    if(input['Operacoes']!='graph'):
        result = RealizaOperacao(valoresConsiderados,input['Operacoes'])
    else:
        count+=1
        result = 'graph'+str(count)+'.png'
        geraGraficos(valoresConsiderados,count)
    return [result,count]
