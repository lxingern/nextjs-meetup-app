import { Fragment } from 'react'
import MeetupDetail from '../../components/meetups/MeetupDetail'

function MeetupDetails() {
    return (
        <MeetupDetail 
            image="https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg" 
            title="First Meetup" 
            address="Some street, some city" 
            description="This is a first meetup" 
        />
    )
}

export async function getStaticPaths() {
    return {
        fallback: false,
        paths: [
            { 
                params: {
                    meetupId: 'm1'
                }
            },
            { 
                params: {
                    meetupId: 'm2'
                }
            }
        ]
    }
}

export async function getStaticProps(context) {
    // fetch data for single meetup

    const meetupId = context.params.meetupId

    return {
        props: {
            meetupData: {
                image: 'https://upload.wikimedia.org/wikipedia/commons/d/d3/Stadtbild_M%C3%BCnchen.jpg',
                id: 'm1',
                title: 'First Meetup',
                address: 'Some street, some city',
                description: 'This is a first meetup'
            }
        }
    }
}

export default MeetupDetails