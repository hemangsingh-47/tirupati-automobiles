async function testBooking() {
  try {
    const response = await fetch('http://localhost:5000/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerName: 'Test User',
        phoneNumber: '1234567890',
        email: 'test@example.com',
        carBrand: 'Honda',
        carModel: 'Civic',
        manufacturingYear: '2020',
        fuelType: 'Petrol',
        registrationNumber: 'AB12CD3456',
        serviceType: 'General Service',
        preferredDate: '2026-07-10',
        preferredTime: '10:00',
      })
    });
    const data = await response.json();
    console.log('Booking API Response:', data);
  } catch (error) {
    console.error('Booking failed:', error);
  }
}
testBooking();
