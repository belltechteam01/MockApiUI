import IDynamicFieldBasicInfo from "./DynamicFiledSchema";

export default interface ITemplateBasicInfo {
    templateId:string;
    templateName:string;
    creationDate:string;
    templateDescr:string;
    templateValue:string;
    templateDomain:[];
    templateCategory:[];
    templateSubCategory:[];
    templateDynamicFields:[
        dynamicField:IDynamicFieldBasicInfo
    ];
    
}