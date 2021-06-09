<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";
  import meetups from "./Meetups/meetups-store";

  let editMode = false;

  function addMeetup(event) {
    const meetupData = {
      contactEmail: event.detail.email,
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      imageUrl: event.detail.imageUrl,
      description: event.detail.description,
      address: event.detail.address,
    };

    meetups.addMeetup(meetupData);
    editMode = false;
  }

  function toggleFavorite(event) {
    meetups.toggleFavorite(event.detail);
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }

  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = true)}>New Meetup</Button>
  </div>
  {#if editMode}
    <EditMeetup on:save={addMeetup} on:cancel={() => (editMode = false)} />
  {/if}
  <MeetupGrid meetups={$meetups} on:toggleFavorite={toggleFavorite} />
</main>
