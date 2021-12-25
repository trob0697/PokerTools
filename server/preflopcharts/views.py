from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getChart(request):
    with open("./preflopcharts/data.json", "r") as file:
        data = json.load(file)
    try: 
        params = request.query_params
        res = data[params["game"]][params["scenario"]][params["villain"]][params["hero"]]
        return Response(res, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)
