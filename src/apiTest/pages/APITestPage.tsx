import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Box, styled } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '../../common/components/Based/Modal';
import Button from '../../common/components/Based/Button';
import { ApiContent } from '../components/ApiContent';
import { TreeComponent, ITreeItemData } from '../components/NavTree/TreeComponent';
import { CollectionFilterComponent } from '../components/NavTree/CollectionFilterComponent';

import { useActions } from '../api/actions';
import styles from './styles.module.scss';
import { ISelectedField } from '../../common/components/Based/Breadcrumbs/Breadcrumbs.types';
import { useApiContent } from '../contexts/ApiContentContext';

const FlexContainer = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  height: '100%',
  //   alignItems: "center",
  justifyContent: 'space-between'
}));

const TreeContainer = styled(Box)(() => ({
  minWidth: 300,
  height: '100%',
  borderRightColor: '#DDDDDD',
  borderRightStyle: 'solid',
  borderRightWidth: '1px'
}));

const APIContainer = styled(Box)(() => ({
  height: '100%',
  minWidth: 800,
  flexGrow: 1,
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const findSelectedObj = (entireObj: any, keyToFind: string | number, valToFind: any) => {
  let foundObj;
  JSON.stringify(entireObj, (_, nestedValue) => {
    if (nestedValue && nestedValue[keyToFind] === valToFind) {
      foundObj = nestedValue;
    }
    return nestedValue;
  });
  return foundObj;
};

const findPath = (ob: any, key: string | number, value: any) => {
  const path: any[] = [];
  const keyExists = (obj: any) => {
    if (!obj || (typeof obj !== 'object' && !Array.isArray(obj))) {
      return false;
    } else if (obj.hasOwnProperty(key) && obj[key] === value) {
      return true;
    } else if (Array.isArray(obj)) {
      for (let i = 0; i < obj.length; i++) {
        const new_obj = { ...obj[i] };
        delete new_obj.children;
        path.push(new_obj);
        const result: any = keyExists(obj[i]);
        if (result) return result;
        path.pop();
      }
    } else {
      for (const k in obj) {
        const result: any = keyExists(obj[k]);
        if (result) return result;
      }
    }

    return false;
  };

  keyExists(ob);

  return path;
};

const APITestPage: React.FC = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id') || '';
  const type = new URLSearchParams(search).get('type') || '';
  const navigate = useNavigate();
  const { getFile } = useApiContent();

  const {
    isLoading,
    folders,
    addCollection,
    deleteCollection,
    addFolder,
    updateFolder,
    deleteFolder,
    addRequest,
    deleteRequest,
    duplicateRequest,
    addExample,
    deleteExample,
    duplicateExample,
    getExample
  } = useActions();

  const { resData } = useApiContent();

  const [selectedNodeId, setSelectedNodeId] = useState('1');
  const [deleteNode, setDeleteNode] = useState<ITreeItemData | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false);
  const [treePath, setTreePath] = useState<ISelectedField[]>([]);
  const [childList, setChildList] = useState<ITreeItemData[]>([]);
  // const [responseData, setResponseData] = useState<any>({});

  useEffect(() => {
    setSelectedNodeId(id.toString());
    if (id && type === 'REQUEST' && getFile) getFile({ itemId: id });
    else if (id && type === 'EXAMPLE' && getExample) getExample({ itemId: id });
    else {
      const selectedNode: ITreeItemData = findSelectedObj(folders, 'id', id) || { id: '', name: '', children: [] };
      setChildList(selectedNode?.children || []);
    }
    const path = findPath(folders, 'id', id);
    setTreePath(path);
  }, [id, type, folders]);

  const onDeleteModalClose = () => {
    setDeleteNode(null);
    setDeleteModalOpen(false);
  };

  const onDeleteNode = () => {
    if (deleteNode?.type === 'COLLECTION') {
      const params = {
        companyId: '1',
        collectionId: deleteNode.id
      };
      if (deleteCollection) deleteCollection(params);
    } else {
      const path = findPath(folders, 'id', deleteNode?.id);
      const collectionId = path.find((ele) => ele.type === 'COLLECTION')?.id || '';

      const params = {
        companyId: '1',
        collectionId,
        itemId: deleteNode?.id
      };
      switch (deleteNode?.type) {
        case 'FOLDER':
          if (deleteFolder) deleteFolder(params);
          break;
        case 'REQUEST':
          if (deleteRequest) deleteRequest(params);
          break;
        case 'EXAMPLE':
          if (deleteExample) deleteExample(params);
          break;
      }
    }

    setDeleteNode(null);
    setDeleteModalOpen(false);
  };

  const handleTreeSelect = (e: React.SyntheticEvent<Element, Event>, nodeIds: string) => {
    console.log('treeSelected nodeId===>', nodeIds);
    handleSelected(nodeIds);
  };

  const handleSelected = (nodeIds: string) => {
    setSelectedNodeId(nodeIds);
    const selectedNode: any = findSelectedObj(folders, 'id', nodeIds);
    navigate(`/api-test?type=${selectedNode.type}&id=${nodeIds}`);
  };

  const handleRename = (nodeId: string, value: string) => {
    const { id }: any = findSelectedObj(folders, 'id', nodeId);
    const path = findPath(folders, 'id', nodeId);
    const collectionId = path.find((ele) => ele.type === 'COLLECTION')?.id || '';
    if (id) {
      const queryParams = {
        companyId: '1',
        collectionId: collectionId,
        itemId: id,
        itemName: value
      };

      if (updateFolder) updateFolder(queryParams);
    }
  };

  const handleMenuClick = (nodeId: string, menuName: string) => {
    console.log('menu click event==>', nodeId, menuName);
    const { type, name, id, method, children }: any = findSelectedObj(folders, 'id', nodeId);

    const path = findPath(folders, 'id', nodeId);
    console.log('path==>', path);

    let queryParams: any = {};
    queryParams.companyId = '1';
    queryParams.collectionId = path.find((ele) => ele.type === 'COLLECTION')?.id || '';

    switch (menuName) {
      case 'Add folder':
        queryParams.parentId = nodeId;
        queryParams.itemName = 'New Folder';
        if (addFolder) addFolder(queryParams);
        break;
      case 'Duplicate':
        queryParams.parentId = path[path.length - 2]?.id || '';
        queryParams.itemId = nodeId;
        if (type === 'REQUEST' && duplicateRequest) duplicateRequest(queryParams);
        else if (type === 'EXAMPLE' && duplicateExample) duplicateExample(queryParams);
        break;
      case 'Delete':
        const tempDeleteData = {
          id,
          type,
          name,
          method,
          children
        };
        setDeleteNode(tempDeleteData);
        setDeleteModalOpen(true);
        break;
      case 'Add Request':
        queryParams.parentId = nodeId;
        queryParams.itemName = 'New Request';
        if (addRequest) addRequest(queryParams);
        break;
      case 'Add Example':
        // if (addFolder) console.log("add folder===>", addFolder(queryParams));
        console.log('add example==>');
        queryParams.parentId = nodeId;
        queryParams.itemName = 'New Example';
        if (addExample) addExample(queryParams);
        break;

      default:
        break;
    }
  };

  const handleAddCollection = () => {
    const queryParams = {
      companyId: '1',
      itemName: 'New Collection'
    };
    if (addCollection) addCollection(queryParams);
  };

  const schema = yup.object().shape({
    companyId: yup.string().default('1'),
    generalInfo: yup.object({
      selectedLanguages: yup
        .array(
          yup.object({
            languageCode: yup.string(),
            languageName: yup.string()
          })
        )
        .default([
          {
            languageCode: 'EN',
            languageName: 'English'
          }
        ]),
      defaultLanguage: yup.object({
        languageCode: yup.string(),
        languageName: yup.string()
      })
    })
  });

  const methods = useForm({
    resolver: yupResolver(schema)
    // defaultValues: data,
  });

  return (
    // <ApiContentProvider>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        borderColor: '#EDEDED',
        borderWidth: '1px',
        borderStyle: 'solid'
      }}
    >
      <FlexContainer>
        <TreeContainer>
          <CollectionFilterComponent onAddCollection={handleAddCollection} />
          <TreeComponent
            treeItems={folders}
            selectedNodeId={selectedNodeId}
            isLoading={isLoading}
            onNodeSelect={(e: React.SyntheticEvent<Element, Event>, nodeIds: string) => handleTreeSelect(e, nodeIds)}
            onRename={handleRename}
            onChangeSelected={handleSelected}
            onMenuClick={handleMenuClick}
          />
        </TreeContainer>
        <APIContainer>
          <FormProvider {...methods}>
            <form method="post">
              <ApiContent treePath={treePath} childList={childList} resInfo={resData}></ApiContent>
            </form>
          </FormProvider>
        </APIContainer>
      </FlexContainer>
      {deleteNode && (
        <Modal title={`Delete "${deleteNode.name}"`} open={deleteModalOpen} onClose={onDeleteModalClose} classes={{ header: styles.modalHeader }} isAcceptable={false}>
          <div className={styles.deleteModal}>
            <div className={styles.modalContent}>
              <p>Are you sure you want to delete {deleteNode.name}?</p>
              <div className={styles.btnWrapper}>
                <div className={styles.cancelBtnWrapper}>
                  <Button text="cancel" classes={{ root: styles.cancelBtn }} onClick={onDeleteModalClose} loading={false} />
                </div>
                <div className={styles.deleteBtnWrapper}>
                  <Button text="Delete" classes={{ root: styles.deleteBtn }} onClick={onDeleteNode} loading={false} />
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </Box>
    // </ApiContentProvider>
  );
};

export default APITestPage;
