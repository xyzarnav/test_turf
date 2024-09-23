import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col, Button, Select } from 'antd';
import TurfCard from './TurfCard';

const { Option } = Select;

const DemoPage = () => {
    const [turfs, setTurfs] = useState([]);
    const [areas, setAreas] = useState([]);
    const [sortOrder, setSortOrder] = useState(null);
    const [selectedArea, setSelectedArea] = useState('');

    useEffect(() => {
        fetchAreas();
        fetchTurfs();
    }, [sortOrder, selectedArea]);

    const fetchTurfs = async () => {
        try {
            const response = await axios.get('http://localhost:3001/turfs', {
                params: {
                    priceOrder: sortOrder,
                    area: selectedArea
                }
            });
            setTurfs(response.data);
        } catch (error) {
            console.error('Error fetching turfs:', error);
        }
    };

    const fetchAreas = async () => {
        try {
            const response = await axios.get('http://localhost:3001/areas');
            setAreas(response.data);
        } catch (error) {
            console.error('Error fetching areas:', error);
        }
    };

    const handleSort = (order) => {
        setSortOrder(order);
    };

    const handleAreaChange = (value) => {
        setSelectedArea(value);
    };

    return (
        <div>
            <h1>Turf Listings</h1>
            <div style={{ marginBottom: '16px' }}>
                <Button onClick={() => handleSort('lowToHigh')}>Sort by Price: Low to High</Button>
                <Button onClick={() => handleSort('highToLow')}>Sort by Price: High to Low</Button>
                <Select style={{ width: 200, marginLeft: '16px' }} onChange={handleAreaChange} value={selectedArea}>
                    <Option value="">All Areas</Option>
                    {areas.map(area => (
                        <Option key={area} value={area}>{area}</Option>
                    ))}
                </Select>
            </div>
            <Row gutter={[16, 16]}>
                {turfs.map(turf => (
                    <Col key={turf.id} xs={24} sm={12} md={8}>
                        <TurfCard turf={turf} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default DemoPage;
