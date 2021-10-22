from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

@api_view(['GET'])
def getChart(request):
    with open("./api/preflopcharts/data.json", "r") as file:
        data = json.load(file)
    
    try: 
        params = request.query_params
        res = data[params["game"]][params["scenario"]][params["villain"]][params["hero"]]

        return Response(res)
    except:
        return Response({}, 400)
