import { v4 as uuidv4 } from 'uuid';

export class WorkflowSettings
{
    static readonly WORKFLOW_ID_DEFAULT = "1";
    static readonly WORKFLOW_NAME_DEFAULT = "Untitled";

    static readonly NODE_ID_DEFAULT = uuidv4();
    static readonly NODE_NAME_DEFAULT = "Untitled";
    static readonly NODE_TYPE_DEFAULT = 0;

    static readonly NODE_INPUT_MAX = 2;
    static readonly NODE_INPUT_MIN = 0;
    static readonly NODE_OUTPUT_MAX = 2;
    static readonly NODE_OUTPUT_MIN = 0;

    static readonly NODE_COLOR_DEFAULT = 'rgba(1, 1, 1)';
    static readonly NODE_BACKGROUND_COLOR_DEFAULT = 'rgba(100, 100, 100)';
    static readonly NODE_OUTLINE_COLOR_DEFAULT = 'rgba(50, 50, 50)';
    static readonly NODE_OUTLINE_WIDTH_DEFAULT = '3';

    static readonly NODE_WIDTH_DEFAULT = 150;
    static readonly NODE_HEIGHT_DEFAULT = 50;

    static readonly NODE_POS_X_DEFAULT = 10;
    static readonly NODE_POS_Y_DEFAULT = 10;
    static readonly NODE_POS_X_MAX = 1000;
    static readonly NODE_POS_Y_MAX = 1000;
    
    static readonly Node_EDGE_POS_OFFSET = 10;
    
    static readonly NODE_SHAPE_DEFAULT = "workNode";
    
    static readonly PANEL_COORDINATE = "bottom-left";
    static readonly PANEL_ZOOM_DEFAULT = 1.5;
    static readonly PANEL_ZOOM_MIN = 0.2;
    static readonly PANEL_ZOOM_MAX = 4;

    static readonly PANEL_SCALE = 1.0;
};