import app from 'flarum/app';
import Modal from 'flarum/components/Modal';
import sortByAttribute from 'flagrow/terms/helpers/sortByAttribute';

export default class UserPoliciesStateModal extends Modal {
    init() {
        super.init();
    }

    title() {
        return app.translator.trans('flagrow-terms.forum.state-modal.title', {
            username: this.props.user.username(),
        });
    }

    content() {
        return m('.Modal-body', m('ul', sortByAttribute(app.store.all('flagrow-terms-policies')).map(policy => {
            const state = this.props.user.flagrowTermsPoliciesState()[policy.id()];

            return m('li', policy.name() + ': ' + (state && state.accepted_at ? app.translator.trans('flagrow-terms.forum.state-modal.accepted-at', {
                date: state.accepted_at,
            }) : app.translator.trans('flagrow-terms.forum.state-modal.not-accepted')));
        })));
    }
}
