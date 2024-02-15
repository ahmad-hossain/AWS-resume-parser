import react from 'react'
import { Card, Button } from 'react-bootstrap'
import download from 'downloadjs'
export default function FileCard({ file }) {
    const handleDownload = async () => {
        console.log('Clicked Dowload');
        const res = await fetch('http://localhost:4000/download/' + file.fileIndex)
        const blob = await res.blob();
        download(blob, 'resume.pdf');
    }

    return (
        <>
            <Card className='file-card' style={{ width: '18rem', margin: '10px auto' }}>
                <Card.Body>
                    <Card.Title>{file.name}</Card.Title>
                    {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>

                    </Card.Text> */}
                    <Card.Link href={'mailto: ' + file.email}>Email</Card.Link>
                    <Card.Link href={'tel:' + file.phone}>Phone</Card.Link>
                    <div>
                        <Button onClick={handleDownload} variant="primary" size='sm' style={{ marginTop: 10 }}>Download Resume</Button>
                    </div>
                </Card.Body>
            </Card>
        </>
    )
}