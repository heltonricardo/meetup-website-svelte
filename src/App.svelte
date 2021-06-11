<script>
  import Button from "./UI/Button.svelte";
  import Header from "./UI/Header.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";
  import meetups from "./Meetups/meetups-store";

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
</style>

<Header />
<main>
  {#if page === "overview"}
    {#if editMode}
      <EditMeetup
        id={editedId}
        on:close={closeEditMode}
      />
    {/if}

    <MeetupGrid
      meetups={$meetups}
      on:edit={startEdit}
      on:showdetails={showDetails}
      on:add={() => editMode = true}
    />

  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
