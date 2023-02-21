import { Fragment } from 'react'
import Head from 'next/head'
import { MongoClient } from 'mongodb'
import MeetupList from '../components/meetups/MeetupList'

function HomePage(props) {
    return  (
        <Fragment>
            <Head>
                <title>React Meetups</title>
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

// export async function getServerSideProps(context) {
//     const req = context.req
//     const res = context.res
//     // fetch data
//     return {
//         props: {
//             meetsups: DUMMY_MEETUPS
//         }
//     }
// }

export async function getStaticProps() {
    // fetch data
    const client = await MongoClient.connect(`mongodb+srv://xingern:${process.env.mongoDBPassword}@cluster0.p16tjw1.mongodb.net/meetups?retryWrites=true&w=majority`)
    const db = client.db()

    const meetupsCollection = db.collection('meetups')

    const meetups = await meetupsCollection.find().toArray()

    client.close()

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 10
    }
}

export default HomePage