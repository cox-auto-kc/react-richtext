import React,{PropTypes} from 'react';
import {Entity} from 'draft-js';
import {ENTITY_TYPE} from 'draft-js-utils';
import {ContentBlock} from 'draft-js';

let Props = {
  children: PropTypes.node,
  entityKey: PropTypes.string,
};

 function EntityRangeCallback(start: number, end: number) : void{}

function Link(props_: Props): React.Element {
  const {url} = Entity.get(props_.entityKey).getData();
  return (
    <a href={url}>{props_.children}</a>
  );
}

function findLinkEntities(contentBlock: ContentBlock, callback: EntityRangeCallback) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return (
      entityKey != null &&
      Entity.get(entityKey).getType() === ENTITY_TYPE.LINK
    );
  }, callback);
}

export default {
  strategy: findLinkEntities,
  component: Link
};
