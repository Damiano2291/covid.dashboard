@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-12">
            <h1>Dati aggiornati al: <span id="lastDate"></span> </h1>
        </div>
    </div>
    <div class="row">
        <div class="col-12 col-md-3">
          <div class="card p-5 h-100">
              <h3>Totale decessi</h3>
              <h5 id="death"></h5>
          </div>
        </div>
        <div class="col-12 col-md-3">
            <div class="card p-5 h-100">
                <h3>Nuovi contagiati</h3>
                <h5 id="infect"></h5>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="card p-5 h-100">
                <h3>Attualmente positivi</h3>
                <h5 id="cases"></h5>
            </div>
          </div>
          <div class="col-12 col-md-3">
            <div class="card p-5 h-100">
                <h3>Totale guariti</h3>
                <h5 id="recover"></h5>
            </div>
          </div>
    </div>
</div>

<div class="container">
    <div class="row">
        <div class="col-12 col-md-6">
            <div id="regionDetails" class="card border my-5">
               
            </div>
        </div>
        <div class="col-12 col-md-6">
            <select id="regionWrapper" class="card p-1 h-100 my-5">
               
            </select>
        </div>
    </div>
</div>
@endsection
