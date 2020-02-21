from django.db import models

class Analise(models.Model):
    ativo = models.CharField(max_length = 200)
    periodoInicial = models.DateField()
    periodoFinal = models.DateField()
    operacao = models.CharField(max_length = 200)
    resultado = models.CharField(max_length=200)
