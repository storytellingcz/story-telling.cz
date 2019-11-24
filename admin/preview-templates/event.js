import htm from 'https://unpkg.com/htm?module'
import format from 'https://unpkg.com/date-fns@2.7.0/esm/format/index.js?module'

const html = htm.bind(h)

// Preview component for a Event
const Event = createClass({
  render() {
    const entry = this.props.entry

    return html`
      <main>
        <article>
          <h1>${entry.getIn(['data', 'title'], null)}</h1>
          <dl>
              <dt>Kdy</dt>
              <dd>
                  <time>${
                    format(
                      entry.getIn(['data', 'date'], new Date()),
                      'dd. MM. yyyy'
                    )
                  }</time>
              </dd>
              <dt>Kde</dt>
              <dd>${entry.getIn(['data', 'venue'], '')}</dd>
          </dl>

          ${this.props.widgetFor('body')}
        </article>
      </main>
    `;
  }
});

export default Event
