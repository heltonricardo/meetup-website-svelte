<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";
  import meetups from "./Meetups/meetups-store";

  let editMode = false;

  function addMeetup() {
    editMode = false;
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
  <MeetupGrid meetups={$meetups} />
</main>
