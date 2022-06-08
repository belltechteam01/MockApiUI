import * as Types from "../../types";
import {WorkflowSettings} from "../../settings";
import { v4 as uuidv4 } from 'uuid';
import { CWorkNode } from "services/workflow/workmap/worknode";
import { CWork } from "services/workflow/workmodel/models/work";

export class CConnection implements Types.IEdge{
  
  id: string;
  source: string;
  target: string;
  private srcNode: CWorkNode<CWork>;
  private destNode: CWorkNode<CWork>;

  constructor(src: CWorkNode<CWork>, dest: CWorkNode<CWork>, id: string="") {
    this.id = (id=="") ? uuidv4() : id;

    this.srcNode = src;
    this.destNode = dest;
  }

  getSrcWork(): CWork
  {
    return this.srcNode.getInstance();
  }

  getDestWork(): CWork
  {
    return this.destNode.getInstance();
  }

  getSrcNode(): CWorkNode<CWork>
  {
    return this.srcNode;
  }

  getDestNode(): CWorkNode<CWork> 
  {
    return this.destNode;
  }
}