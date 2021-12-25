from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
import json

import numpy as np
from .calc.holdem_calc import calculate as calc

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def calculate(request):
    try:
        params = request.query_params
        players = json.loads(params["players"])
        board = json.loads(params["board"])

        players = np.array(players).flatten()
        if len(board) == 0: board = None

        res = calc(board, False, 10000, None, players, False)

        return Response(res, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(e, status=status.HTTP_400_BAD_REQUEST)