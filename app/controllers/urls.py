from app import app
from flask import request, jsonify
import json
from flask import render_template
from time import sleep
"""
    Rotas de URL
"""
@app.route("/index")
@app.route("/")
def index():
    
    return render_template("index.html")


@app.route("/index/testar", methods=["GET","POST"])
def testar():
    sleep(5)
    result = 'Resultado do teste do modelo'
    try:
        """
            recuperei os dados e aqui ficara todo o tratamento nescessário,
            como conversão para tipo numpy, criação de dataframe, como tambem ficara aqui,
            quando iremos utlizar o modelo
        """ 

        data = request.get_json()
        print(data)
        
        
        
    except Exception as e:
        return "Ocorreu um erro, tente novamente!"
    return result