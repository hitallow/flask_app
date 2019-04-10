from app import app
from flask import request, jsonify
import json
from flask import render_template
from time import sleep
import random 
"""
    Rotas de URL
"""
@app.route("/index")
@app.route("/")
def index():
    
    return render_template("index.html")


@app.route("/index/testar", methods=["GET","POST"])
def testar():
    #sleep(5)
    result = 'Resultado do teste do modelo'
    try:
        """
            recuperei os dados e aqui ficara todo o tratamento nescessário,
            como conversão para tipo numpy, criação de dataframe, como tambem ficara aqui,
            quando iremos utlizar o modelo
        """ 

        data = request.get_json()
        print(data)
        values = []
        [values.append(ord(random.choice(data[dado]))) for dado in data]
        if( data["tutela-antecipada"] == 'sim'):
            output = abs(1-(sum(values)/5000))
        else:
            output = abs(1-(sum(values)/10000))
        print("out final:> ",output)
        classes = ['PROVIDO', 'IMPROVIDO', 'PARCIALMENTE PROVIDO']
        response = {
            "output": output,
            "class": random.choice(classes)
        }

        return json.dumps(response)
        
        
    except Exception as e:
        print(e)
        return "Ocorreu um erro, tente novamente!"
    return result