export const testData = 
{
  "flowId": "2344",
  "flowName": "",
  "flowSteps": [
    {
      "flowStepId": "12342",
      "flowItemCategory": "API/RULE/CHECK/ACTION/DELAY",
      "parentFlowItemId": "",
      "successChildFlowItemId": "",
      "failureChildFlowItemId": "",
      "apiDetails": {
        "apiId": "123",
        "apiName": "Get Customer Details",
        "successHttpCodes": [
          "200",
          "202"
        ],
        "faliureHttpCodes": [
          "400",
          "404",
          "502",
          "403",
          "empty-means everything other then success are failure"
        ],
        "requestData": [
          {
            "displaySeq": "1",
            "fieldId": "11",
            "fieldName": "customerId",
            "fieldSourceType": "API/INPUTDATA/RULE",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": "JSONPATH"
          },
          {
            "displaySeq": "1",
            "fieldId": "22",
            "fieldName": "applicationNm",
            "fieldSourceType": "API/INPUTDATA/RULE",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": "JSONPATH"
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "111",
            "fieldName": "applicationNm",
            "fieldSourceType": "API/INPUTDATA/RULE",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": "JSONPATH"
          }
        ]
      },
      "rulesDetails": {
        "ruleId": "",
        "ruleName": "",
        "inputData": [
          {
            "displaySeq": "1",
            "fieldId": "",
            "fieldName": "",
            "fieldSourceName": "",
            "fieldSourceId": "",
            "fieldSourceValuePath": ""
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "",
            "fieldName": "",
            "fieldSourceValuePath": ""
          }
        ],
        "parentFlowId": "",
        "childFlowId": ""
      },
      "checkCondition": {
        "checkConditionId": "",
        "checkConditionName": "",
        "conditionPairs": [
          {
            "displaySeq": "1",
            "leftSide": {
              "fieldId": "",
              "fieldName": "",
              "fieldSourceType": "API/INPUTDATA/RULE",
              "fieldSourceValue": "API 001",
              "fieldSourceId": "APIID001",
              "fieldSourceValuePath": "JSONPATH"
            },
            "comparisonCategory": "STRING/NUMERIC/BOOLEAN/DATE",
            "comparisonOprType": "EQUALS/NOTEQUALS/CONTAINS/NOTCONTAINS/BETWEEN",
            "righSide": {
              "displaySeq": "1",
              "fieldId": "",
              "fieldName": "",
              "fieldSourceType": "API/INPUTDATA/RULE",
              "fieldSourceValue": "API 001",
              "fieldSourceId": "APIID001",
              "fieldSourceValuePath": "JSONPATH",
              "dynamicStatic": ""
            },
            "nextJoinType": "AND/OR/NONE"
          }
        ],
        "successActions": [
          {}
        ],
        "failedActions": []
      }
    }
  ]
};