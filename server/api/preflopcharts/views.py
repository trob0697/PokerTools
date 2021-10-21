from rest_framework.response import Response
from rest_framework.decorators import api_view
import json

@api_view(['POST'])
def getAllCharts(request):
    with open("./api/preflopcharts/data.json", "r") as file:
        data = json.load(file)

    if(not request.data):
        res = json.dumps(data)
    else:
        body = request.data
        res = data[body["game"]][body["scenario"]][body["villain"]][body["hero"]]

    return Response(res)
