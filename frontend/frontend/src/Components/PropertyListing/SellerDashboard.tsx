import React, { useContext, useEffect, useState } from 'react'
import { Modal, Table } from 'react-bootstrap'
import uuid from 'react-uuid'
import type { PropertyListing as PropertyListingType } from '../../dataTypes';
import CreatePropertyListing from './CreatePropertyListing';
import { ThemContext } from '../../ThemContext';

type Props = {}

const SellerDashboard = (props: Props) => {

    const [theme] = useContext(ThemContext) ?? ['dark', () => {}];
    const dark = theme === 'dark';

    const [propertyListingResult, setPropertyListingResult] = useState<PropertyListingType[]>([])
    const [showModel, setShowModal] = useState(false);
    const [selectedRow, setSelectedRow] = useState<PropertyListingType>();
    const [responseModal, setResponseModal] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [idtoDelete, setIdToDelete] = useState(0);

    useEffect(() => {
        fetch('http://localhost:5200/api/PropertyListings')
            .then(response => response.json())
            .then(data => setPropertyListingResult(data));
    }, []);

    const openEditModal = (id: any) => {
        setShowModal(true);
        const row = propertyListingResult.find((item) => item.id === parseInt(id));
        setSelectedRow(row);
    }

    const closeEditModal = () => setShowModal(false);
    const openDeleteModal = (id: any) => { setShowDeleteModal(true); setIdToDelete(id); }
    const closeDeleteModal = () => setShowDeleteModal(false);
    const closeResponseModal = () => setResponseModal(false);

    const deleteRecord = () => {
        fetch(`http://localhost:5200/api/PropertyListings/${idtoDelete}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                setShowDeleteModal(false);
                setResponseMessage(data.ResponseMessage || 'Record deleted successfully.');
                setResponseModal(true);
            })
            .catch(error => console.error("Error:", error));
    }

    return (
        <div className={`min-vh-100 p-4 ${dark ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
            <h2 className="mb-4">Your Property Listings</h2>

            <Table
                striped bordered hover
                variant={dark ? 'dark' : undefined}
                className={!dark ? 'table-light' : ''}
            >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Property Type</th>
                        <th>Property Value</th>
                        <th>Property Info</th>
                        <th>City</th>
                        <th>Contact</th>
                        <th>Sell/Rent</th>
                        <th>Ready To Move</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {propertyListingResult.map((row) => (
                        <tr key={uuid()}>
                            <td>{row.id}</td>
                            <td>{row.propertyType}</td>
                            <td>&#8360; {row.propertyValue.toLocaleString()}</td>
                            <td>{row.propertyInfo}</td>
                            <td>{row.propertyCity}</td>
                            <td>{row.ownerContactnbr}</td>
                            <td>{row.propertyAction}</td>
                            <td>{row.moveInFlag ? 'Yes' : 'No'}</td>
                            <td>
                                <div className="d-flex gap-2">
                                    <button className='btn btn-primary btn-sm' onClick={() => openEditModal(row.id)}>Edit</button>
                                    <button className='btn btn-danger btn-sm' onClick={() => openDeleteModal(row.id)}>Delete</button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Edit Modal */}
            <Modal show={showModel} onHide={closeEditModal} centered>
                <Modal.Header closeButton className={dark ? 'bg-dark text-light border-secondary' : ''}>
                    <Modal.Title>Edit Property Details</Modal.Title>
                </Modal.Header>
                <Modal.Body className={dark ? 'bg-dark' : ''}>
                    <CreatePropertyListing source="edit" editData={selectedRow} onClose={closeEditModal} />
                </Modal.Body>
            </Modal>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={closeDeleteModal} centered>
                <Modal.Header closeButton className={dark ? 'bg-dark text-light border-secondary' : ''}>
                    <Modal.Title>Delete Property Listing</Modal.Title>
                </Modal.Header>
                <Modal.Body className={dark ? 'bg-dark text-light' : ''}>
                    <p>Are you sure you want to delete this property listing?</p>
                </Modal.Body>
                <Modal.Footer className={dark ? 'bg-dark border-secondary' : ''}>
                    <button className='btn btn-secondary' onClick={closeDeleteModal}>Cancel</button>
                    <button className='btn btn-danger' onClick={deleteRecord}>Delete</button>
                </Modal.Footer>
            </Modal>

            {/* Response Modal */}
            <Modal show={responseModal} onHide={closeResponseModal} centered>
                <Modal.Header closeButton className={dark ? 'bg-dark text-light border-secondary' : ''}>
                    <Modal.Title>Message</Modal.Title>
                </Modal.Header>
                <Modal.Body className={dark ? 'bg-dark text-light' : ''}>
                    <p>{responseMessage}</p>
                </Modal.Body>
                <Modal.Footer className={dark ? 'bg-dark border-secondary' : ''}>
                    <button className='btn btn-secondary' onClick={closeResponseModal}>Close</button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default SellerDashboard