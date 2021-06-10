<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";
  import meetups from "./Meetups/meetups-store";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode = false;
  let page = "overview";
  let editedId;
  let pageData = {};

  function closeEditMode() {
    editMode = false;
    editedId = false;
  }

  function showDetails(event) {
    page = "details";
    pageData.id = event.detail;
  }

  function closeDetails() {
    page = "overview";
    pageData = {};
  }

  function startEdit(event) {
    editMode = true;
    editedId = event.detail;
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
  {#if page === "overview"}
    <div class="meetup-controls">
      <Button on:click={() => (editMode = true)}>New Meetup</Button>
    </div>

    {#if editMode}
      <EditMeetup
        id={editedId}
        on:save={closeEditMode}
        on:cancel={closeEditMode}
      />
    {/if}

    <MeetupGrid
      meetups={$meetups}
      on:showdetails={showDetails}
      on:edit={startEdit}
    />

  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
