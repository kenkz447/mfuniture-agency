import './GlobalModal.scss';

import * as React from 'react';
import { withContext } from 'react-context-service';
import * as ReactDOM from 'react-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

import { WithDomainContext } from '../base';

const createModalNode = () => {
    const _modalNode = document.createElement('div');
    document.body.append(_modalNode);

    return _modalNode;
};

let modalNode: HTMLDivElement;

const GlobalModal = (props: WithDomainContext) => {
    const {
        globalModal,
        globalModalVisibled,
        globalModalProgressing
    } = props;

    if (!globalModal) {
        return null;
    }

    if (!modalNode) {
        modalNode = createModalNode();
    }

    const { children, title, onOk, okLabel, ...rest } = globalModal;

    return ReactDOM.createPortal(
        (
            <Modal
                {...rest}
                id="globalModal"
                isOpen={globalModalVisibled}
            >
                <ModalHeader toggle={this.toggle}>{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <Button
                        color="secondary"
                        onClick={this.toggle}
                    >
                        Cancel
                    </Button>
                    <Button
                        color="primary"
                        onClick={onOk}
                        disabled={globalModalProgressing}
                    >
                        {okLabel}
                    </Button>
                </ModalFooter>
            </Modal>
        ),
        modalNode
    );
};

export default withContext<WithDomainContext>(
    'globalModal',
    'globalModalProgressing',
    'globalModalVisibled'
)(GlobalModal);