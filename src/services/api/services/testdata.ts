export const testData = 
{
  "flowId": "2344",
  "flowName": "",
  "flowSteps": [
    {
      "flowStepId": "1",
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
            "fieldSourceType": "INPUTDATA",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          },
          {
            "displaySeq": "1",
            "fieldId": "22",
            "fieldName": "applicationNm",
            "fieldSourceType": "API",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "111",
            "fieldName": "applicationNm",
            "fieldSourceType": "API",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          }
        ]
      },
      "rulesDetails": {
        "ruleId": "",
        "ruleName": "",
        "inputData": [
          {
            "displaySeq": "1",
            "fieldId": "1",
            "fieldName": "",
            "fieldSourceName": "",
            "fieldSourceId": "",
            "fieldSourceValuePath": ""
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "1",
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
              "fieldSourceValuePath": ""
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
              "fieldSourceValuePath": "",
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
    },
    {
      "flowStepId": "2",
      "flowItemCategory": "API/RULE/CHECK/ACTION/DELAY",
      "parentFlowItemId": "",
      "successChildFlowItemId": "",
      "failureChildFlowItemId": "",
      "apiDetails": {
        "apiId": "123",
        "apiName": "Wait 3s",
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
            "fieldId": "1",
            "fieldName": "seconds",
            "fieldSourceType": "INPUTDATA",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          },
          {
            "displaySeq": "1",
            "fieldId": "2",
            "fieldName": "process name",
            "fieldSourceType": "API",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          },
          {
            "displaySeq": "1",
            "fieldId": "3",
            "fieldName": "delay sec",
            "fieldSourceType": "API",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "111",
            "fieldName": "applicationNm",
            "fieldSourceType": "API",
            "fieldSourceValue": "API 001",
            "fieldSourceId": "APIID001",
            "fieldSourceValuePath": ""
          }
        ]
      },
      "rulesDetails": {
        "ruleId": "",
        "ruleName": "",
        "inputData": [
          {
            "displaySeq": "1",
            "fieldId": "1",
            "fieldName": "",
            "fieldSourceName": "",
            "fieldSourceId": "",
            "fieldSourceValuePath": ""
          }
        ],
        "outputData": [
          {
            "displaySeq": "1",
            "fieldId": "1",
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
              "fieldSourceValuePath": ""
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
              "fieldSourceValuePath": "",
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