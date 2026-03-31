import React, { useContext, useState } from 'react'
import Select from 'react-select'
import type { PropertyListing } from '../../dataTypes'
import { ThemContext } from '../../ThemContext'

type Props = {
    source: string
    editData?: PropertyListing
    onClose?: () => void
}

const CreatePropertyListing = ({ source, editData, onClose }: Props) => {

    const [theme] = useContext(ThemContext) ?? ['dark', () => {}];
    const dark = theme === 'dark';

    const [listingFormData, setListingFormData] = useState({
        propertyType: editData?.propertyType || "",
        propertyValue: editData?.propertyValue?.toString() || "",
        propertyInfo: editData?.propertyInfo || "",
        ownerContactnbr: editData?.ownerContactnbr || "",
        propertyCity: editData?.propertyCity || "",
        propertyAction: editData?.propertyAction || "",
        moveInFlag: editData?.moveInFlag || false
    })

    const [listingType, setListingType] = useState(editData?.propertyAction || 'sell')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setListingFormData(prev => ({ ...prev, [name]: value }));
    };

    // ✅ Select styles now respond to theme
    const customStyles = {
        control: (base: any) => ({
            ...base,
            backgroundColor: dark ? '#1e293b' : '#f8f9fa',
            borderColor: dark ? '#334155' : '#dee2e6',
            color: dark ? 'white' : '#212529',
            boxShadow: 'none',
            borderRadius: '12px',
            minHeight: '42px',
        }),
        menu: (base: any) => ({
            ...base,
            backgroundColor: dark ? '#1e293b' : '#ffffff',
            borderRadius: '12px',
            overflow: 'hidden',
        }),
        option: (base: any, state: any) => ({
            ...base,
            backgroundColor: state.isFocused
                ? dark ? '#334155' : '#f1f5f9'
                : dark ? '#1e293b' : '#ffffff',
            color: dark ? 'white' : '#212529',
            cursor: 'pointer'
        }),
        singleValue: (base: any) => ({ ...base, color: dark ? 'white' : '#212529' }),
        input: (base: any) => ({ ...base, color: dark ? 'white' : '#212529' }),
        placeholder: (base: any) => ({ ...base, color: dark ? '#94a3b8' : '#6c757d' })
    }

    const handleSubmit = () => {
        const requestData: PropertyListing = {
            propertyType: listingFormData.propertyType,
            propertyValue: Number(listingFormData.propertyValue),
            propertyInfo: listingFormData.propertyInfo,
            ownerContactnbr: listingFormData.ownerContactnbr,
            propertyCity: listingFormData.propertyCity,
            propertyAction: listingFormData.propertyAction || listingType,
            moveInFlag: listingFormData.moveInFlag,
            id: editData?.id || 0
        };

        const isEdit = source === "edit";

        fetch(
            isEdit
                ? `http://localhost:5200/api/PropertyListings/${editData?.id}`
                : 'http://localhost:5200/api/PropertyListings',
            {
                method: isEdit ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(requestData)
            }
        )
            .then(res => res.json())
            .then(data => {
                console.log('Success:', data);
                if (isEdit && onClose) onClose();
            })
            .catch(err => console.error('Error:', err));
    };

    const formFields = (
        <div
            className="p-4"
            style={{
                backgroundColor: dark ? '#0f172a' : '#ffffff',  // ✅ bg responds to theme
                borderRadius: source === 'edit' ? '0' : '0 0 24px 24px'
            }}
        >
            {/* Property Type */}
            <div className="mb-3">
                <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>Property Type</label>
                <Select
                    styles={customStyles}
                    value={listingFormData.propertyType ? { value: listingFormData.propertyType, label: listingFormData.propertyType } : null}
                    onChange={(selected: any) => setListingFormData(prev => ({ ...prev, propertyType: selected.value }))}
                    options={[
                        { value: 'Residential Apartment', label: 'Residential Apartment' },
                        { value: 'Villa', label: 'Villa' },
                        { value: 'Plot', label: 'Plot' },
                        { value: 'Office', label: 'Office' }
                    ]}
                    placeholder="Select property"
                />
            </div>

            {/* Value + City */}
            <div className="row g-3 mb-3">
                <div className="col-md-7">
                    <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>Value</label>
                    <input
                        type="number"
                        name="propertyValue"
                        value={listingFormData.propertyValue}
                        onChange={handleChange}
                        className={`form-control ${dark ? 'bg-dark text-light border-secondary' : ''}`}
                        style={{ borderRadius: '12px' }}
                        placeholder="Enter amount"
                    />
                </div>
                <div className="col-md-5">
                    <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>City</label>
                    <Select
                        styles={customStyles}
                        value={listingFormData.propertyCity ? { value: listingFormData.propertyCity, label: listingFormData.propertyCity } : null}
                        onChange={(selected: any) => setListingFormData(prev => ({ ...prev, propertyCity: selected.value }))}
                        options={[
                            { value: 'mumbai', label: 'Mumbai' },
                            { value: 'pune', label: 'Pune' },
                            { value: 'delhi', label: 'Delhi' }
                        ]}
                        placeholder="Select city"
                    />
                </div>
            </div>

            {/* Contact */}
            <div className="mb-3">
                <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>Contact</label>
                <input
                    type="text"
                    name="ownerContactnbr"
                    value={listingFormData.ownerContactnbr}
                    onChange={handleChange}
                    className={`form-control ${dark ? 'bg-dark text-light border-secondary' : ''}`}
                    style={{ borderRadius: '12px' }}
                    placeholder="Enter phone"
                />
            </div>

            {/* Description */}
            <div className="mb-3">
                <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>Description</label>
                <textarea
                    name="propertyInfo"
                    value={listingFormData.propertyInfo}
                    onChange={handleChange}
                    className={`form-control ${dark ? 'bg-dark text-light border-secondary' : ''}`}
                    style={{ borderRadius: '12px' }}
                    rows={3}
                    placeholder="Enter property details"
                />
            </div>

            {/* Purpose */}
            <div className="mb-3">
                <label className={`form-label ${dark ? 'text-light' : 'text-dark'}`}>Purpose</label>
                <div className="d-flex gap-2">
                    <button
                        type="button"
                        className={`btn btn-sm flex-fill py-2 ${listingType === 'sell' ? 'btn-success' : dark ? 'btn-outline-secondary' : 'btn-outline-secondary'}`}
                        style={{ borderRadius: '10px' }}
                        onClick={() => { setListingType('sell'); setListingFormData(prev => ({ ...prev, propertyAction: 'sell' })); }}
                    >Sell</button>
                    <button
                        type="button"
                        className={`btn btn-sm flex-fill py-2 ${listingType === 'rent' ? 'btn-warning' : dark ? 'btn-outline-secondary' : 'btn-outline-secondary'}`}
                        style={{ borderRadius: '10px' }}
                        onClick={() => { setListingType('rent'); setListingFormData(prev => ({ ...prev, propertyAction: 'rent' })); }}
                    >Rent</button>
                </div>
            </div>

            {/* Ready to Move */}
            <div className={`form-check form-switch mb-4 ${dark ? 'text-light' : 'text-dark'}`}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={listingFormData.moveInFlag}
                    onChange={(e) => setListingFormData(prev => ({ ...prev, moveInFlag: e.target.checked }))}
                />
                <label className="form-check-label ms-2">Ready to Move</label>
            </div>

            {/* Submit */}
            <button
                className="btn btn-primary w-100 py-2"
                style={{ borderRadius: '12px' }}
                onClick={handleSubmit}
            >
                {source === 'edit' ? 'Save Changes' : 'Save Update'}
            </button>
        </div>
    )

    if (source === 'edit') {
        return formFields;  // ✅ no extra style tags needed anymore
    }

    return (
        <div
            className={`min-vh-100 d-flex align-items-center py-5 ${dark ? 'bg-dark' : 'bg-light'}`}
        >
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                        <div className={`card border-0 shadow-lg`} style={{ borderRadius: '24px' }}>
                            {/* Card Header */}
                            <div className="card-header bg-primary text-white border-0 p-4" style={{ borderRadius: '24px 24px 0 0' }}>
                                <h5 className="mb-1">List Your Property</h5>
                                <small className="opacity-75">Fill in details to publish listing</small>
                            </div>
                            {formFields}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreatePropertyListing