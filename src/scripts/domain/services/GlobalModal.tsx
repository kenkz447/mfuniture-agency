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
        globalModalProgressing,
        setContext
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
                {
                    title && <ModalHeader>{title}</ModalHeader>
                }
                <ModalBody>
                    {children}
                </ModalBody>
                <ModalFooter>
                    <div className="left-side">
                        <Button
                            className="btn-link"
                            color="default"
                            type="button"
                            onClick={() => setContext({
                                globalModalVisibled: false
                            })}
                        >
                            Hủy
                        </Button>
                    </div>
                    <div className="divider" />
                    <div className="right-side">
                        <Button
                            className="btn-link"
                            color="danger"
                            type="button"
                            onClick={onOk}
                            disabled={globalModalProgressing}
                        >
                            {okLabel}
                        </Button>
                    </div>
                </ModalFooter>
            </Modal >
        ),
        modalNode
    );
};

export default withContext<WithDomainContext>(
    'globalModal',
    'globalModalProgressing',
    'globalModalVisibled'
)(GlobalModal);