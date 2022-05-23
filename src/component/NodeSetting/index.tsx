/* eslint-disable react/jsx-props-no-spreading */
import { Box, Drawer } from '@mui/material';
import React, { useEffect, useMemo } from 'react';
import { Node } from 'react-flow-renderer';
// import useGetApis from '../../hooks/useGetApis';
// import useAddStep from './../../hooks/useAddStep';
// import useTestStep from '../../hooks/useTestStep';
import { NODE_TYPES } from 'utils/constant';
import ApiSetting from './ApiSetting';
import RuleSetting from './RuleSetting';
import CheckSetting from './CheckSetting';

import styles from './styles.module.scss';

interface INodeSettingProps {
  onDrawerClose?: (event: React.KeyboardEvent | React.MouseEvent) => void;
  onSave?: Function;
  isOpen?: boolean;
  children?: React.ReactNode;
  data: any | null;
}

const NodeSetting: React.FC<INodeSettingProps> = ({ onSave, data }) => {
  console.log('nodeSetting==>', data);
  const [openDrawer, setOpenDrawer] = React.useState(false);

  useEffect(() => {
    if (data && data.type) {
      switch (data.type) {
        case NODE_TYPES.CALL_API:
          setOpenDrawer(true);
          break;
        case NODE_TYPES.CALL_RULE:
          setOpenDrawer(true);
          break;
        case NODE_TYPES.CHECK:
          setOpenDrawer(true);
          break;
        default:
          setOpenDrawer(false);
          break;
      }
    } else {
      setOpenDrawer(false);
    }
  }, [data?.type]);

  const toggleDrawer = (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
      return;
    }

    setOpenDrawer(open);
  };

  type Anchor = 'right';

  const renderSettings = (anchor: Anchor) => {
    let element = <></>;
    if (data && data?.type) {
      switch (data.type) {
        case NODE_TYPES.CALL_API:
          element = <ApiSetting properties={data?.properties} />;
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
      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer('right', false)}>
        {renderSettings('right')}
      </Drawer>
    </>
  );
};
export default NodeSetting;
