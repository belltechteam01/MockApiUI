/* eslint-disable react/jsx-props-no-spreading */
import { Box, Drawer } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Node } from 'react-flow-renderer';
// import useGetApis from '../../hooks/useGetApis';
// import useAddStep from './../../hooks/useAddStep';
// import useTestStep from '../../hooks/useTestStep';
import ApiSetting, { IApiSettingProps } from './ApiSetting';
import RuleSetting from './RuleSetting';
import CheckSetting from './CheckSetting';
import { NODE_TYPES } from '../../utils/constant';

import styles from './styles.module.scss';

interface INodeSettingProps extends IApiSettingProps {
  isOpen?: boolean;
  children?: React.ReactNode;
  data: any | null;
}

const NodeSetting: React.FC<INodeSettingProps> = ({ onSave, data, isOpen, selectList, onDrawerClose, onSelectAPI }) => {
  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    onDrawerClose?.(event, open);
  };

  type Anchor = 'right';

  const renderSettings = (anchor: Anchor) => {
    let element = <></>;
    if (data && data?.type) {
      switch (data.type) {
        case NODE_TYPES.CALL_API:
          element = <ApiSetting properties={data?.properties} onSave={onSave} selectList={selectList} onSelectAPI={onSelectAPI} />;
          break;
        case NODE_TYPES.CALL_RULE:
          element = <RuleSetting />;
          break;
        case NODE_TYPES.CHECK:
          element = <CheckSetting />;

        default:
          break;
      }
    }
    return (
      <Box sx={{ width: 450 }} role="presentation">
        {element}
      </Box>
    );
  };

  // const handleChangeFieldPath = (value: string) => {
  //   const elements: any = dataElements.map((ele: any, idx) => {
  //     if (ele[Object.keys(ele)[0]].attributeName === fieldName) ele[Object.keys(ele)[0]].fieldPath = value;
  //     return ele;
  //   });
  //   setDataElements(elements);
  // };

  return (
    <>
      <Drawer anchor="right" open={isOpen} onClose={toggleDrawer('right', false)}>
        {renderSettings('right')}
      </Drawer>
    </>
  );
};
export default NodeSetting;
